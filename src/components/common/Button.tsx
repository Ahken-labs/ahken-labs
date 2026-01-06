'use client';
import fonts from '@/constants/fonts';
import Image, { StaticImageData } from 'next/image';

export interface ButtonProps {
  text: string;
  icon: StaticImageData;
  onClick?: () => void;
  href?: string; // ✅ ADD THIS
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  textSize?: number;
  iconSize?: number;
}

export default function Button({
  text,
  icon,
  onClick,
  href,
  backgroundColor = '#FFFFFF',
  textColor = '#000000',
  className = '',
  textSize,
  iconSize,
}: ButtonProps) {
  const commonStyles = {
    backgroundColor,
    borderRadius: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
  };

  const content = (
    <>
      <Image
        src={icon}
        alt="icon"
        width={iconSize ?? 24}
        height={iconSize ?? 24}
        style={{ marginRight: 8 }}
      />
      <span
        style={{
          fontSize: textSize ?? 20,
          fontWeight: fonts.weight.button_weight,
          color: textColor,
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {text}
      </span>
    </>
  );

  // ✅ IF EMAIL / LINK — USE <a>
  if (href) {
    return (
      <a
        href={href}
        className={`flex items-center px-[32px] py-[14px] ${className}`}
        style={commonStyles}
      >
        {content}
      </a>
    );
  }

  // ✅ NORMAL BUTTON
  return (
    <button
      onClick={onClick}
      style={commonStyles}
      className={`flex items-center px-[32px] py-[14px] ${className}`}
    >
      {content}
    </button>
  );
}
