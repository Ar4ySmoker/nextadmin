"use client";
import React, { useState, useEffect } from "react";
import { getProfessionlist } from "@/db/queries/professions";
import { Icons } from "@/assets/icons";

interface DropdownProps {
    title: string,
    placeholder: string,
    callback: Function
}

const Dropdown = ({ title, placeholder, callback }: DropdownProps) => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [professions, setProfessions] = useState<any[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const professionsData = await callback("yourQuery");
                setProfessions(professionsData);
            } catch (error) {
                console.error("Ошибка при загрузке списка:", error);
            }
        };

        fetchData();
    }, []);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    return (
        <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
                {" "}
                {title}{" "}
            </label>

            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    value={selectedOption}
                    onChange={(e) => {
                        setSelectedOption(e.target.value);
                        changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? "text-black dark:text-white" : ""
                        }`}
                >
                    <option value="" disabled className="text-body dark:text-bodydark">
                        {placeholder}
                    </option>
                    {professions?.map((profession) => (
                        <option key={profession.id} value={profession.id} className="text-body dark:text-bodydark">
                            {profession.name}
                        </option>
                    ))}
                </select>

                <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                    {Icons.ArrowIcon()}
                </span>
            </div>
        </div>
    );
};

export default Dropdown;
