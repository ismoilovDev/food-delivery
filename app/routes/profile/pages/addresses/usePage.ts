import { useState } from "react";
import {
	useCreateAddress,
	useDeleteAddress,
	useMyAddresses,
	useSetDefaultAddress,
} from "~/lib/api/hooks/useAddresses";
import { useMe } from "~/lib/api/hooks/useUser";
import { useAuthStore } from "~/store/authStore";
import { useI18nStore } from "~/store/i18nStore";

export function useProfileAddressesPage() {
	const { t } = useI18nStore();
	const user = useAuthStore((s) => s.user);
	const { data: me } = useMe();

	const { data: addresses = [], isLoading } = useMyAddresses();
	const createAddress = useCreateAddress();
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

	function handleSaveAddress(lat: number, lng: number, address: string) {
		const contactName = me?.fullName ?? user?.fullName ?? "";
		const contactPhone = me?.phone ?? user?.phone ?? "";
		createAddress.mutate(
			{
				fullAddress: address,
				latitude: lat,
				longitude: lng,
				isDefault: addresses.length === 0,
				contactName,
				contactPhone,
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
		isSavingAddress: createAddress.isPending,
		handleSetDefault,
		handleDeleteConfirm,
		handleSaveAddress,
	};
}
