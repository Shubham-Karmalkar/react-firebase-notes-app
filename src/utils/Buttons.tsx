export const ActiveEffectBtn = ({
  children,
  pageId,
  currentPgeId,
  className,
  activeClass,
  onClick,
}: {
  children?: any;
  pageId?: string;
  currentPgeId?: string;
  className?: any;
  activeClass?: any;
  onClick?: any;
}) => {
  return (
    <div
      onClick={() => onClick(pageId)}
      className={`${className} ${pageId === currentPgeId ? activeClass : ""}`}
    >
      {children}
    </div>
  );
};
