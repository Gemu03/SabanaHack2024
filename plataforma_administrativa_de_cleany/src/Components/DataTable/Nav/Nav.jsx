import React from "react";
import { Button } from "../../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
const Nav = () => {
  return (
    <nav className="flex flex-col">
        <a href="/data">
        <Button variant="ghost">
              <li>Lista de lavados de manos</li>
            </Button>
            </a>
          <a href="/dashboard">
        <Button variant="ghost">
              <li>Dashboard</li>
            </Button>
            </a>
    </nav>
  );
};
export default Nav;
