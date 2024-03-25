import React, { useState, useRef } from 'react';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const ComicBookPage = () => {
    const [pages, setPages] = useState([]);
    const pagesRef = useRef();

    const handleChange = (event) => {
        const file = event.target.files[0];
        const image = URL.createObjectURL(file);
        const newPage = { image, text: '' };
        setPages([...pages, newPage]);
    }

    const handleTextChange = (index, event) => {
        const newPages = [...pages];
        newPages[index].text = event.target.value;
        setPages(newPages);
    }

    const saveAsPDF = () => {
        const input = pagesRef.current;
        html2canvas(input, {
            scrollY: -window.scrollY,
            useCORS: true,
            width: input.scrollWidth,
            height: input.scrollHeight
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size
            pdf.save("download.pdf"); 
        });
    }

    return (
        <div ref={pagesRef}>
            <h3>Upload Comic Book Pages</h3>
            <input type="file" onChange={handleChange} />
            {pages.map((page, index) => (
                <div key={index} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                    <img src={page.image} alt={`Comic Book Page ${index + 1}`} style={{ width: '100px', height: '100px' }} />
                    <p>Page text</p>
                    <textarea value={page.text} onChange={(event) => handleTextChange(index, event)}></textarea>
                    <p>{page.text}</p>
                </div>
            ))}
            <button onClick={saveAsPDF}>Save as PDF</button>
        </div>
    );
}

export default ComicBookPage;