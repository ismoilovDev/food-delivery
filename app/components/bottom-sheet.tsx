import type { ReactNode } from "react";
import { Drawer } from "vaul";

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

/**
 * iOS-style swipeable bottom sheet.
 * Swipe down or tap backdrop to dismiss.
 */
export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
			direction="bottom"
		>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-[60] bg-black/40" />
				<Drawer.Content
					aria-describedby={undefined}
					className="fixed bottom-0 left-0 right-0 z-[60] flex flex-col bg-white rounded-t-3xl outline-none px-4 pt-2 pb-8"
				>
					{/* Drag handle */}
					<div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mt-2 mb-4 shrink-0" />
					{children}
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
