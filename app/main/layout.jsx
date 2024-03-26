import Header from "../Components/Header";

export default function MainLayout({ children }) {
	return (
		<div className="flex flex-col h-screen w-full">
			<div className="h-[12vh]">
				<Header />
			</div>
			<div className="h-[88vh] dark:bg-[#171717] overflow-y-scroll py-2 px-3 no-scrollbar">
				<div className="dark:bg-[#0D0D0D] rounded-xl">
					{children}
				</div>
			</div>
		</div>
	);
}
