import Header from "../Components/Header";

export default function DeliveryLayout({ children }) {
	return (
		<div className="flex flex-col h-screen w-full">
			<div className="h-[12vh]">
				<Header />
			</div>
			<div className="h-[88vh] dark:bg-[#171717] py-2 px-3 ">
				<div className="dark:bg-[#0D0D0D] h-full rounded-xl">
					{children}
				</div>
			</div>
		</div>
	);
}
