import * as RadixSelect from "@radix-ui/react-select";
import { CaretDown, Check } from "phosphor-react";

type SelectProps = {
  name: string;
  placeholder: string;
  options: { displayText: string; value: string }[];
};

const Select = ({ name, placeholder, options }: SelectProps) => {
  const placeholderFormatted = (
    <span className="text-zinc-500">{placeholder}</span>
  );

  return (
    <RadixSelect.Root name={name}>
      <RadixSelect.Trigger>
        <button className="cursor-pointer w-full bg-zinc-900 rounded py-3 px-4 flex-1 flex items-center justify-between">
          <RadixSelect.Value placeholder={placeholderFormatted} />
          <RadixSelect.Icon>
            <CaretDown />
          </RadixSelect.Icon>
        </button>
      </RadixSelect.Trigger>

      <RadixSelect.Portal className="w-full">
        <RadixSelect.Content>
          <RadixSelect.ScrollUpButton />

          <RadixSelect.Viewport className="bg-zinc-600 p-2 rounded flex-column">
            {options.map((option) => (
              <RadixSelect.Item
                value={option.value}
                className="flex item-center relative cursor-pointer pl-6 pr-2 py-2 rounded-md text-sm text-white font-medium focus:bg-zinc-800 radix-disabled:opacity-50 focus:outline-none Radixselect-none"
              >
                <RadixSelect.ItemIndicator className="absolute left-1 top-2.5">
                  <Check className="h-4 w-4" />
                </RadixSelect.ItemIndicator>

                <RadixSelect.ItemText>
                  <span className="text-white ">{option.displayText}</span>
                </RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
            <RadixSelect.Separator />
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
