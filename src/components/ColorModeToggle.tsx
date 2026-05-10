import { Box } from "@chakra-ui/react";
import {useColorMode} from "@/components/ui/color-mode.tsx";

const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";

    return (
        <Box
            as="button"
            onClick={toggleColorMode}
            width="52px"
            height="28px"
            borderRadius="full"
            css={{ background: isDark ? "#1a1a3e !important" : "#ee1515 !important" }}
            position="relative"
            transition="background 0.3s ease"
            cursor="pointer"
            border="none"
            outline="none"
        >
            <Box
                position="absolute"
                top="4px"
                left={isDark ? "28px" : "4px"}
                width="20px"
                height="20px"
                borderRadius="full"
                css={{ background: isDark ? "#ffde00 !important" : "white !important" }}
                boxShadow={"0 0 0 2px black"}
                transition="left 0.3s ease, background 0.3s ease"
            />
        </Box>
    );
};

export default ColorModeToggle;