import * as React from "react";
import { Button } from "@blueprintjs/core";
import {  Popover2 } from "@blueprintjs/popover2";

export default function Pop({text, icon, className, content}){
    return (
        <div>
            <Popover2
                content={content}
                placement={"bottom"}
                renderTarget={({ isOpen, ref, ...targetProps }) => (
                    <Button {...targetProps} elementRef={ref} className={className||""} text={text} icon={icon||null} />
                )}
            />
        </div>
    );
}