//create a context fot the mui tabs 

import { createContext, useState, useEffect, useContext } from "react";

type TabsType = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

export const TabsContext = createContext<TabsType>({
    value: 0,
    setValue: () => { },
});

export default function TabsProvider({

    children,
}: {
    children: React.ReactNode;
}) {
    const [value, setValue] = useState<number>(0);

    return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>;
}