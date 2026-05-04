

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: LucideIcon;
  size?: number | string;
  className?: string;
}

export function Icon({ icon: IconComponent, size = 24, className, ...props }: IconProps) {
  return <IconComponent size={size} className={className} {...props} />;
}