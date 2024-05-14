export interface IMenu {
    label: string;
    icon: React.ReactElement;
    path: string;
    content: React.ReactNode;
    valor?: number;
    OnClick?:() => void;
    children?: IMenu[];
}