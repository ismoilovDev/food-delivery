import { Map as YMap, YMaps } from "@pbe/react-yandex-maps";
import { AlertCircle, Loader2, MapPin, Navigation, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { YANDEX_MAPS_API_KEY } from "~/lib/config";

interface AddressPickerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (lat: number, lng: number) => void;
	isSaving: boolean;
	t: {
		pickLocation: string;
		useCurrentLocation: string;
		confirmAddress: string;
		loadingAddress: string;
	};
}

// Default center: Tashkent [lat, lng] — Maps 2.x format
const DEFAULT_CENTER: [number, number] = [41.2995, 69.2401];

export function AddressPickerModal({
	isOpen,
	onClose,
	onSave,
	isSaving,
	t,
}: AddressPickerModalProps) {
	// biome-ignore lint/suspicious/noExplicitAny: ymaps untyped
	const mapRef = useRef<any>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
	const [address, setAddress] = useState("");
	const [isGeocoding, setIsGeocoding] = useState(false);
	const [isLocating, setIsLocating] = useState(false);
	const [mapReady, setMapReady] = useState(false);
	const [mapError, setMapError] = useState("");

	// Reset state when modal closes
	useEffect(() => {
		if (!isOpen) {
			if (debounceRef.current) clearTimeout(debounceRef.current);
			setMapReady(false);
			setAddress("");
			setCenter(DEFAULT_CENTER);
			setMapError("");
		}
	}, [isOpen]);

	const reverseGeocodeCenter = useCallback(async (lat: number, lng: number) => {
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

	const handleMapLoad = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: ymaps untyped
		(ymapsInstance: any) => {
			if (!ymapsInstance) {
				setMapError("Xarita yuklanmadi. API key ni tekshiring.");
				return;
			}
			setMapReady(true);
			reverseGeocodeCenter(DEFAULT_CENTER[0], DEFAULT_CENTER[1]);
		},
		[reverseGeocodeCenter]
	);

	const handleBoundsChange = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: ymaps event untyped
		(e: any) => {
			const newCenter = e.get("newCenter") as [number, number];
			if (!newCenter) return;
			setCenter(newCenter);
			if (debounceRef.current) clearTimeout(debounceRef.current);
			debounceRef.current = setTimeout(() => {
				reverseGeocodeCenter(newCenter[0], newCenter[1]);
			}, 600);
		},
		[reverseGeocodeCenter]
	);

	function handleUseCurrentLocation() {
		if (!navigator.geolocation) return;
		setIsLocating(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { latitude, longitude } = pos.coords;
				const newCenter: [number, number] = [latitude, longitude];
				setCenter(newCenter);
				if (mapRef.current) {
					mapRef.current.setCenter(newCenter, 16, { duration: 300 });
				}
				reverseGeocodeCenter(latitude, longitude);
				setIsLocating(false);
			},
			() => setIsLocating(false),
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	}

	function handleSave() {
		const [lat, lng] = center;
		onSave(lat, lng);
	}

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[60] flex flex-col bg-white">
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
				{YANDEX_MAPS_API_KEY ? (
					<YMaps query={{ apikey: YANDEX_MAPS_API_KEY, lang: "ru_RU" }}>
						<YMap
							instanceRef={mapRef}
							defaultState={{ center: DEFAULT_CENTER, zoom: 14 }}
							width="100%"
							height="100%"
							onLoad={handleMapLoad}
							onBoundsChange={handleBoundsChange}
							options={{ suppressMapOpenBlock: true }}
						/>
					</YMaps>
				) : (
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 px-6">
						<AlertCircle size={40} className="text-red-400" />
						<p className="text-sm text-gray-500 text-center">Yandex Maps API key mavjud emas.</p>
					</div>
				)}

				{/* Error state */}
				{mapError && (
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 px-6">
						<AlertCircle size={40} className="text-red-400" />
						<p className="text-sm text-gray-500 text-center">{mapError}</p>
					</div>
				)}

				{/* Loading state */}
				{!mapReady && !mapError && YANDEX_MAPS_API_KEY && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-50 pointer-events-none">
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
					disabled={isSaving || !mapReady}
					className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base shadow-lg shadow-orange-200 active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				>
					{isSaving ? <Loader2 size={18} className="animate-spin" /> : t.confirmAddress}
				</button>
			</div>
		</div>
	);
}
