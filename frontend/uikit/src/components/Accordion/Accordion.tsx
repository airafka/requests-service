import {
    Accordion as MUIAccordion,
    AccordionDetails,
    AccordionSummary,
    useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { type AccordionProps } from "./types";
import { useAccordionStyles } from "./styles";

const expandIcon = <ExpandMoreIcon />;

export const Accordion = ({ title, children }: AccordionProps) => {
    const theme = useTheme();
    const classes = useAccordionStyles({ theme });

    return (
        <>
            <MUIAccordion className={classes.root} elevation={0}>
                <AccordionSummary className={classes.title} expandIcon={expandIcon}>
                    {title}
                </AccordionSummary>

                <AccordionDetails className={classes.content}>{children}</AccordionDetails>
            </MUIAccordion>
        </>
    );
};
