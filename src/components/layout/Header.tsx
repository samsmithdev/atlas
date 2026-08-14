import { ReactNode } from "react";

interface HeaderProps {
  leftNode?: ReactNode;
  centerNode?: ReactNode;
  rightNode?: ReactNode;
}

export default function Header({
  leftNode,
  centerNode,
  rightNode,
}: HeaderProps) {
  return (
    <header className="grid grid-cols-3 items-center h-16 px-4 border-b bg-background">
      <div className="flex justify-start items-center gap-2">{leftNode}</div>
      <div className="flex justify-center items-center">{centerNode}</div>
      <div className="flex justify-end items-center gap-2">{rightNode}</div>
    </header>
  );
}
