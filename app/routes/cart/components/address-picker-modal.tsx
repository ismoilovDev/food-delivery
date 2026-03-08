import { AlertCircle, Loader2, MapPin, Navigation, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { YANDEX_MAPS_API_KEY } from "~/lib/config";

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ymaps3: any;
	}
}

interface AddressPickerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (lat: number, lng: number, address: string) => void;
	isSaving: boolean;
	t: {
		pickLocation: string;
		useCurrentLocation: string;
		confirmAddress: string;
		loadingAddress: string;
	};
}

// Default center: Tashkent [lng, lat]
const DEFAULT_CENTER: [number, number] = [69.2401, 41.2995];

export function AddressPickerModal({
	isOpen,
	onClose,
	onSave,
	isSaving,
	t,
}: AddressPickerModalProps) {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	// biome-ignore lint/suspicious/noExplicitAny: ymaps3 untyped
	const mapRef = useRef<any>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
	const [address, setAddress] = useState("");
	const [isGeocoding, setIsGeocoding] = useState(false);
	const [isLocating, setIsLocating] = useState(false);
	const [mapReady, setMapReady] = useState(false);
	const [mapError, setMapError] = useState("");

	const reverseGeocodeCenter = useCallback(async (lng: number, lat: number) => {
		setIsGeocoding(true);
		try {
			const { reverseGeocode } = await import("~/lib/api/services/location");
			const res = await reverseGeocode({ latitude: lat, longitude: lng });
			const label = res.data?.fullAddress ?? res.data?.formattedAddress;
			if (label) setAddress(label);
		} catch {
			// ignore geocode errors silently
		} finally {
			setIsGeocoding(false);
		}
	}, []);

	function initMap() {
		if (!mapContainerRef.current || mapRef.current) return;
		if (!window.ymaps3) {
			setMapError("Xarita yuklanmadi. API key tekshiring.");
			return;
		}

		window.ymaps3.ready
			.then(() => {
				if (!mapContainerRef.current) return;

				const map = new window.ymaps3.YMap(mapContainerRef.current, {
					location: { center: DEFAULT_CENTER, zoom: 14 },
					onUpdate: ({ location }: { location: { center: [number, number] } }) => {
						const [lng, lat] = location.center;
						setCenter([lng, lat]);
						if (debounceRef.current) clearTimeout(debounceRef.current);
						debounceRef.current = setTimeout(() => {
							reverseGeocodeCenter(lng, lat);
						}, 600);
					},
				});

				map.addChild(new window.ymaps3.YMapDefaultSchemeLayer());
				map.addChild(new window.ymaps3.YMapDefaultFeaturesLayer());

				mapRef.current = map;
				setMapReady(true);
				reverseGeocodeCenter(DEFAULT_CENTER[0], DEFAULT_CENTER[1]);
			})
			.catch(() => {
				setMapError("Xarita yuklanmadi. API key tekshiring.");
			});
	}

	// Load Yandex Maps script when modal opens
	useEffect(() => {
		if (!isOpen) return;

		const scriptId = "ymaps3-script";

		if (!YANDEX_MAPS_API_KEY) {
			setMapError("Yandex Maps API key mavjud emas.");
			return;
		}

		// Script already in DOM — wait for ymaps3 to become available
		if (document.getElementById(scriptId)) {
			if (window.ymaps3) {
				initMap();
			} else {
				// Script still loading — poll until ymaps3 is ready
				const interval = setInterval(() => {
					if (window.ymaps3) {
						clearInterval(interval);
						initMap();
					}
				}, 100);
			}
			return;
		}

		const script = document.createElement("script");
		script.id = scriptId;
		script.src = `https://api-maps.yandex.ru/3.0/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU`;
		script.async = true;
		script.onload = () => initMap();
		script.onerror = () => setMapError("Xarita yuklanmadi. Internet yoki API key ni tekshiring.");
		document.head.appendChild(script);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	// Destroy map when modal closes
	useEffect(() => {
		if (!isOpen) {
			if (mapRef.current) {
				try {
					mapRef.current.destroy();
				} catch {}
				mapRef.current = null;
			}
			if (debounceRef.current) clearTimeout(debounceRef.current);
			setMapReady(false);
			setAddress("");
			setCenter(DEFAULT_CENTER);
			setMapError("");
		}
	}, [isOpen]);

	function handleUseCurrentLocation() {
		if (!navigator.geolocation) return;
		setIsLocating(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				const newCenter: [number, number] = [longitude, latitude];
				setCenter(newCenter);
				if (mapRef.current) {
					mapRef.current.update({ location: { center: newCenter, zoom: 16 } });
				}
				reverseGeocodeCenter(longitude, latitude);
				setIsLocating(false);
			},
			() => setIsLocating(false),
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	}

	function handleSave() {
		const [lng, lat] = center;
		onSave(lat, lng, address);
	}

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex flex-col bg-white">
			{/* Header */}
			<div className="flex items-center justify-between px-4 pt-12 pb-3 border-b border-gray-100 shrink-0">
				<h2 className="text-lg font-bold text-gray-900">{t.pickLocation}</h2>
				<button
					type="button"
					onClick={onClose}
					className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
				>
					<X size={18} className="text-gray-600" />
				</button>
			</div>

			{/* Current location row */}
			<button
				type="button"
				onClick={handleUseCurrentLocation}
				disabled={isLocating}
				className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 shrink-0 active:bg-orange-50 transition-colors disabled:opacity-60"
			>
				{isLocating ? (
					<Loader2 size={18} className="text-orange-500 animate-spin" />
				) : (
					<Navigation size={18} className="text-orange-500" />
				)}
				<span className="text-sm font-medium text-orange-500">{t.useCurrentLocation}</span>
			</button>

			{/* Map area */}
			<div className="relative flex-1 overflow-hidden bg-gray-100">
				{/* Map container — always mounted so ref is ready */}
				<div ref={mapContainerRef} className="w-full h-full" />

				{/* Error state */}
				{mapError && (
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 px-6">
						<AlertCircle size={40} className="text-red-400" />
						<p className="text-sm text-gray-500 text-center">{mapError}</p>
					</div>
				)}

				{/* Loading state */}
				{!mapReady && !mapError && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-50">
						<Loader2 size={32} className="text-orange-400 animate-spin" />
					</div>
				)}

				{/* Center pin */}
				{mapReady && (
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						<MapPin
							size={40}
							className="text-orange-500 drop-shadow-lg -translate-y-5"
							fill="currentColor"
							fillOpacity={0.2}
						/>
					</div>
				)}

				{/* Address overlay */}
				{mapReady && (address || isGeocoding) && (
					<div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
						{isGeocoding ? (
							<div className="flex items-center gap-2">
								<Loader2 size={14} className="text-orange-400 animate-spin" />
								<span className="text-sm text-gray-500">{t.loadingAddress}</span>
							</div>
						) : (
							<p className="text-sm font-medium text-gray-800">{address}</p>
						)}
					</div>
				)}
			</div>

			{/* Save button */}
			<div className="px-4 py-4 border-t border-gray-100 shrink-0">
				<button
					type="button"
					onClick={handleSave}
					disabled={isSaving || isGeocoding || !address}
					className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				>
					{isSaving ? <Loader2 size={18} className="animate-spin" /> : t.confirmAddress}
				</button>
			</div>
		</div>
	);
}
