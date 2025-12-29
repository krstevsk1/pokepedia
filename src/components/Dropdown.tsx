import {CardBody, CardRoot, Heading} from "@chakra-ui/react";
import {FaChevronDown} from "react-icons/fa";
import React, {useState} from "react";
import styled from "styled-components";

const DropdownHeader = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    margin: 0 5%;
`

interface CardDropdownProps {
    title: string;
    children?: React.ReactNode;
    defaultOpen?: boolean;
}

const Dropdown = ({title, children, defaultOpen}: CardDropdownProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen ?? false)

    const handleOpen = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    return (
        <CardRoot>
            <DropdownHeader onClick={() => handleOpen()}>
                <Heading size="md">{title}</Heading>
                <FaChevronDown />
            </DropdownHeader>

            { isOpen && <CardBody>
                {children}
            </CardBody> }
        </CardRoot>
    )
}

export default Dropdown;