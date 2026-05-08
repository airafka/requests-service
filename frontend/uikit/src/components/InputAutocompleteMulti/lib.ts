export const sortList = {
    searchOptions: <T extends object>(args: {
        options: T[];
        inputValue: string;
        label: keyof T;
    }): T[] => {
        const { inputValue, options, label } = args;
        return options.sort((a, b) => {
            if (!inputValue) {
                return 0;
            }
            const aLabel = String(a[label]);
            const bLabel = String(b[label]);
            const aStartsWith = aLabel.toLowerCase().startsWith(inputValue.toLowerCase()) ?? false;
            const bStartsWith = bLabel.toLowerCase().startsWith(inputValue.toLowerCase()) ?? false;
            if (aStartsWith && !bStartsWith) {
                return -1;
            }
            if (!aStartsWith && bStartsWith) {
                return 1;
            }
            return aLabel?.localeCompare(bLabel) ?? 0;
        });
    },
};
