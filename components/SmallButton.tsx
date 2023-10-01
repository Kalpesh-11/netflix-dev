import { ButtonProps } from "@/types";
function SmallButton({ title, icon, btnFormat, btnClass }: ButtonProps) {
  return (
    <>
      <span
        className={`${btnClass} ${btnFormat} w-fit h-fit inline-block rounded-full p-2 cursor-pointer`}
      >
        {icon}
      </span>
      {title && <span>{title}</span>}
    </>
  );
}

export default SmallButton;
