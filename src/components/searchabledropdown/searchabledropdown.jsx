import { useState, useRef, useEffect } from "react";
import "./SearchableDropdown.css";

function SearchableDropdown({
    data = [],
    value = "",
    placeholder = "Search...",
    onChange
}) {

    const [filteredData, setFilteredData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const wrapperRef = useRef(null);

    useEffect(() => {

        function handleOutsideClick(event) {

            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }

        }

        document.addEventListener(
            "click",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "click",
                handleOutsideClick
            );
        };

    }, []);

    const handleFocus = () => {

        setFilteredData(data);
        setCurrentIndex(-1);

        if (data.length) {
            setIsOpen(true);
        }

    };

    const handleInputChange = e => {

        const newValue = e.target.value;

        if (onChange) {
            onChange(newValue);
        }

        const filtered = data.filter(item =>
            item
                .toLowerCase()
                .includes(
                    newValue
                        .trim()
                        .toLowerCase()
                )
        );

        setFilteredData(filtered);
        setCurrentIndex(-1);
        setIsOpen(filtered.length > 0);

    };

    const handleSelect = selectedValue => {

        if (onChange) {
            onChange(selectedValue);
        }

        setIsOpen(false);

    };

    const handleKeyDown = e => {

        if (!filteredData.length) {
            return;
        }

        if (e.key === "ArrowDown") {

            e.preventDefault();

            setCurrentIndex(prev =>
                prev >= filteredData.length - 1
                    ? 0
                    : prev + 1
            );

        }

        if (e.key === "ArrowUp") {

            e.preventDefault();

            setCurrentIndex(prev =>
                prev <= 0
                    ? filteredData.length - 1
                    : prev - 1
            );

        }

        if (
            e.key === "Enter" &&
            currentIndex >= 0
        ) {

            e.preventDefault();

            handleSelect(
                filteredData[currentIndex]
            );

        }

        if (e.key === "Escape") {
            setIsOpen(false);
        }

    };

    return (

        <div
            className="searchable-dropdown"
            ref={wrapperRef}
        >

            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onFocus={handleFocus}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />

            {isOpen && (

                <ul className="dropdown-list">

                    {filteredData.map(
                        (item, index) => (

                            <li
                                key={item}
                                className={
                                    index === currentIndex
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    handleSelect(
                                        item
                                    )
                                }
                            >
                                {item}
                            </li>

                        )
                    )}

                </ul>

            )}

        </div>

    );

}

export default SearchableDropdown;