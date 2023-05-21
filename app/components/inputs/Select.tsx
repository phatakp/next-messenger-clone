import { FC } from "react";
import ReactSelect from "react-select";

interface ISelectProps {
    label: string;
    value?: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

export const Select: FC<ISelectProps> = ({
    label,
    value,
    onChange,
    options,
    disabled,
}) => {
    return (
        <div className="z-[100]">
            <label className="block text-sm font-medium leading-6 text-gray-900 ">
                {label}
            </label>
            <div className="mt-2 text-black">
                <ReactSelect
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    isMulti
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999,
                            color: "#000",
                        }),
                    }}
                    classNames={{
                        control: () => "text-sm text-black",
                    }}
                />
            </div>
        </div>
    );
};
