import { Button } from "@/components/ui/button";

interface ResultCardProps {
	subjectTitle: string;
	subjectCreditPoints: number;
	subjectOrganisationalName: string;
	subjectExcerpt: string;
	subjectConfidenceScore: number;
	subjectTags: string[];
	subjectID: string;
}

const Tags = ({ subjectTags }: { subjectTags: string[] }) => {
	return (
		<>
			{subjectTags.map((tag: string, i: number) => {
				const backgroundColor = `#${
					tag === "Communication"
						? "d85b2b"
						: tag === "Education"
						? "50d9df"
						: tag === "Business"
						? "a2cdd3"
						: tag === "DAB"
						? "e6dd92"
						: tag === "Engineering"
						? "fe323b"
						: tag === "IT"
						? "24a3e6"
						: tag === "Health"
						? "e358c1"
						: tag === "Law"
						? "6660ce"
						: tag === "Science"
						? "fff178"
						: tag === "Transdisciplinary"
						? "cf7a56"
						: "ffffff" // Default to white
				}`;
				const textColor = backgroundColor !== "#ffffff" ? "white" : "black";

				return (
					<Button
						key={i}
						size="tiny"
						className={`min-w-max inline-block truncate px-2 text-xs font-bold hover:bg-white hover:text-black mr-1`}
						style={{
							backgroundColor: backgroundColor,
							color: textColor,
						}}
					>
						{tag}
					</Button>
				);
			})}
		</>
	);
};

export function ResultCard({
	subjectTitle,
	subjectCreditPoints,
	subjectOrganisationalName,
	subjectExcerpt,
	subjectConfidenceScore,
	subjectTags,
	subjectID,
}: ResultCardProps) {
	return (
		<div className="w-full h-[200px] rounded-sm bg-navbar p-2 flex flex-col">
			<span className="flex justify-between w-full">
				<b className="text-white text-lg ml-1 mt-1 max-w-[85%] leading-4">
					{subjectTitle}
				</b>
				<span>
					<b className="text-white text-sm mr-1 mt-0.5">
						{subjectCreditPoints}cp
					</b>
				</span>
			</span>
			<i className="text-white ml-1 text-sm">{subjectOrganisationalName}</i>
			<p className="text-gray-300 ml-1 text-xs">{subjectExcerpt}</p>

			<span>
				<Tags subjectTags={subjectTags} />
			</span>

			<span className="flex justify-between w-full mt-auto">
				<p className="text-gray-300 ml-1 text-xs mt-2">
					{subjectConfidenceScore}% match
				</p>
				<i className="text-white text-lg mr-1 -pb-1">{subjectID}</i>
			</span>
		</div>
	);
}
