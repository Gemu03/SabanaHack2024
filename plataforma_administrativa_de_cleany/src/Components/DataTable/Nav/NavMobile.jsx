import React from "react";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const NavMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Este botón será visible solo en pantallas pequeñas */}
        <Button variant="outline" className="md:hidden">
          ☰
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 md:flex flex-col w-64 bg-blue-900 text-white min-h-screen"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Menú</SheetTitle>
        </SheetHeader>
        <Nav />
      </SheetContent>
    </Sheet>
  );
};
export default NavMobile;
