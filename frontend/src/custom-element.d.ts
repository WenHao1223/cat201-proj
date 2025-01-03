declare namespace JSX {
    interface IntrinsicElements {
        'box-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            type?: "solid" | "regular" | "logo";
            name: string;
            color?: string;
            size?: string;
            rotate?: number;
            flip?: "horizontal" | "vertical";
            border?: "square" | "circle";
            animation?: string;
            pull?: "left" | "right";
        };
    }
}