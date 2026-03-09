import { useEffect, useState } from "react";
import { useMe, useUpdateMe } from "~/lib/api/hooks/useUser";
import { useI18nStore } from "~/store/i18nStore";

export function useProfileInfoPage() {
	const { t } = useI18nStore();
	const { data: user, isLoading } = useMe();
	const updateMe = useUpdateMe();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [savedMsg, setSavedMsg] = useState(false);

	useEffect(() => {
		if (user) {
			setFirstName(user.firstName ?? "");
			setLastName(user.lastName ?? "");
		}
	}, [user]);

	function handleSave() {
		updateMe.mutate(
			{ firstName: firstName.trim(), lastName: lastName.trim() },
			{
				onSuccess: () => {
					setSavedMsg(true);
					setTimeout(() => setSavedMsg(false), 2000);
				},
			}
		);
	}

	const hasChanges =
		firstName.trim() !== (user?.firstName ?? "") || lastName.trim() !== (user?.lastName ?? "");

	return {
		t,
		user,
		isLoading,
		firstName,
		setFirstName,
		lastName,
		setLastName,
		hasChanges,
		isSaving: updateMe.isPending,
		savedMsg,
		handleSave,
	};
}
