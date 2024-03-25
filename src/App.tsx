import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

const pdfs = [
	{
		name: "Dummy PDF",
		file: "dummy.pdf",
	},
	{
		name: "Dummy PDF",
		file: "dummy.pdf",
	},
	{
		name: "Dummy PDF",
		file: "dummy.pdf",
	},
	{
		name: "Dummy PDF",
		file: "dummy.pdf",
	},
	{
		name: "Dummy PDF",
		file: "dummy.pdf",
	},
	{
		name: "Dummy PDF",
		file: "dummy.pdf",
	},
];

const PDF = ({
	file,
	name,
	active,
	setActive,
}: {
	file: string;
	name: string;
	active: boolean;
	setActive: () => void;
}) => {
	const [pageNumber, setPageNumber] = useState(1);

	const isMobile = window.innerWidth < 768;

	return (
		<div className="relative border rounded h-fit grow-0 group border-zinc-300">
			{active && (
				<div className="absolute bottom-0 left-0 right-0 z-50 flex justify-between gap-5 p-5 transition-all opacity-0 text-zinc-900 bg-zinc-200 group-hover:opacity-100">
					<button onClick={() => setPageNumber((prev) => prev - 1)} disabled={pageNumber === 1}>
						Previous
					</button>
					<p>Page {pageNumber}</p>
					<button onClick={() => setPageNumber((prev) => prev + 1)}>Next</button>
				</div>
			)}
			{!active && (
				<button
					className="absolute bottom-0 left-0 right-0 z-50 flex justify-between gap-5 p-5 transition-all text-zinc-900 bg-zinc-200"
					onClick={() => setActive()}>
					View - {name}
				</button>
			)}
			{active && (
				<button className="absolute top-0 right-0 z-50 p-5 text-zinc-900 bg-zinc-200" onClick={() => setActive()}>
					close
				</button>
			)}
			<Document file={file}>
				<Page
					pageNumber={pageNumber}
					renderAnnotationLayer={false}
					height={active ? window.innerWidth - 200 : 400}
					width={isMobile ? window.innerWidth - 40 : undefined}
				/>
			</Document>
		</div>
	);
};

function App() {
	const [active, setActive] = useState(-1);

	return (
		<main className="w-screen h-screen p-5 overflow-auto md:px-20 bg-zinc-50">
			<div className="flex flex-wrap gap-5">
				{active === -1 &&
					pdfs.map((pdf, index) => (
						<PDF
							key={index}
							file={pdf.file}
							name={pdf.name}
							active={active === index}
							setActive={() => setActive(active !== index ? index : -1)}
						/>
					))}
				{active !== -1 && (
					<PDF file={pdfs[active].file} name={pdfs[active].name} active={true} setActive={() => setActive(-1)} />
				)}
			</div>
		</main>
	);
}

export default App;
