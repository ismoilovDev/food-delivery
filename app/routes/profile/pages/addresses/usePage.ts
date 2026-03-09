import { useState } from "react";
import {
	useCreateAddressFromCoordinates,
	useDeleteAddress,
	useMyAddresses,
	useSetDefaultAddress,
} from "~/lib/api/hooks/useAddresses";
import { useAuthStore } from "~/store/authStore";
import { useI18nStore } from "~/store/i18nStore";

export function useProfileAddressesPage() {
	const { t } = useI18nStore();
	const user = useAuthStore((s) => s.user);

	const { data: addresses = [], isLoading } = useMyAddresses();
	const createAddressFromCoords = useCreateAddressFromCoordinates();
	const deleteAddress = useDeleteAddress();
	const setDefault = useSetDefaultAddress();

	const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
	const [isPickerOpen, setIsPickerOpen] = useState(false);

	function handleSetDefault(id: number) {
		setDefault.mutate(id);
	}

	function handleDeleteConfirm() {
		if (deleteTargetId === null) return;
		deleteAddress.mutate(deleteTargetId, {
			onSuccess: () => setDeleteTargetId(null),
		});
	}

	function handleSaveAddress(lat: number, lng: number) {
		createAddressFromCoords.mutate(
			{
				latitude: lat,
				longitude: lng,
				isDefault: addresses.length === 0,
				contactName: user?.fullName ?? "",
				contactPhone: user?.phone ?? "",
			},
			{ onSuccess: () => setIsPickerOpen(false) }
		);
	}

	return {
		t,
		addresses,
		isLoading,
		deleteTargetId,
		setDeleteTargetId,
		isPickerOpen,
		setIsPickerOpen,
		isDeleting: deleteAddress.isPending,
		isSettingDefault: setDefault.isPending,
		isSavingAddress: createAddressFromCoords.isPending,
		handleSetDefault,
		handleDeleteConfirm,
		handleSaveAddress,
	};
}
