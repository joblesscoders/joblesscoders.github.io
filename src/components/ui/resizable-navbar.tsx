"use client";
import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import logo from "@/../public/assets/Jobless_coders_colored.png";

const NavbarContext = createContext<{ visible: boolean }>({ visible: false });

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemsProps {
  items: {
    name: string;
    link?: string;
    children?: React.ReactNode;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MegaMenuItemProps {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  link?: string;
  children?: React.ReactNode;
  onItemClick?: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarContext.Provider value={{ visible }}>
      <header
        role="banner"
        className={cn("sticky inset-x-0 top-4 z-40 w-full transition-all duration-300", className)}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
            : child
        )}
      </header>
    </NavbarContext.Provider>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "relative z-[60] mx-auto hidden flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex transition-all duration-300 ease-out",
        visible
          ? "w-full max-w-4xl bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-lg border border-border mt-1"
          : "w-full max-w-7xl",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const MegaMenuItem = ({
  setActive,
  active,
  item,
  link,
  children,
  onItemClick,
}: MegaMenuItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isOpen = active === item;

  const handleMouseEnter = () => {
    if (!children) return;
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setActive(item);
  };

  const handleMouseLeave = () => {
    if (!children) return;
    leaveTimerRef.current = setTimeout(() => {
      setActive(null);
    }, 150);
  };

  // Handle click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setActive]);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  if (link && !children) {
    return (
      <div className="relative px-2 py-1">
        <Link
          href={link}
          onClick={onItemClick}
          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors duration-150 relative z-20 font-medium px-3 py-1.5 rounded-lg hover:bg-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 inline-flex items-center min-h-[40px]"
        >
          {item}
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative px-2 py-1"
    >
      <div className="relative z-20 inline-flex items-center rounded-lg hover:bg-muted/50 focus-within:bg-muted/50">
        {link ? (
          <Link
            href={link}
            onClick={onItemClick}
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors duration-150 font-medium pl-3 pr-1 py-1.5 rounded-l-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 inline-flex items-center min-h-[40px]"
          >
            {item}
          </Link>
        ) : (
          <span className="pl-3 pr-1 py-1.5 font-medium text-neutral-600 dark:text-neutral-300">
            {item}
          </span>
        )}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
            setActive(isOpen ? null : item);
          }}
          aria-label={`${isOpen ? "Close" : "Open"} ${item} menu`}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls="solutions-mega-menu"
          className="cursor-pointer text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors duration-150 px-2.5 py-1.5 rounded-r-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 inline-flex items-center justify-center min-h-[40px] min-w-[36px]"
        >
          <IconChevronDown
            className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </div>

      {children && isOpen && (
        <div
          role="region"
          aria-label={`${item} Submenu`}
          className="absolute top-[calc(100%_+_0.6rem)] left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 z-50"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-muted-foreground lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <MegaMenuItem
          key={`nav-item-${idx}`}
          setActive={setActive}
          active={active}
          item={item.name}
          link={item.link}
          onItemClick={() => {
            setActive(null);
            if (onItemClick) onItemClick();
          }}
        >
          {item.children}
        </MegaMenuItem>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-2 py-2 lg:hidden transition-all duration-300 ease-out",
        visible && "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md rounded-2xl border border-border shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus first focusable element inside menu
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    // Escape key listener to close menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        const toggleBtn = document.getElementById("mobile-nav-toggle");
        toggleBtn?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        aria-hidden="true"
      />

      <div
        ref={menuRef}
        id="mobile-nav-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={cn(
          "absolute inset-x-0 top-16 z-50 flex w-full max-h-[calc(100vh-6rem)] overflow-y-auto flex-col items-start justify-start gap-4 rounded-2xl bg-card p-6 shadow-2xl border border-border transition-all duration-200",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      id="mobile-nav-toggle"
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-menu"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      className="p-3 min-h-[48px] min-w-[48px] rounded-xl text-foreground hover:bg-muted transition-colors flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2 cursor-pointer"
    >
      {isOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
    </button>
  );
};

export const NavbarLogo = () => {
  const { visible } = useContext(NavbarContext);

  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-2 min-h-[44px] text-sm font-light cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2 rounded"
      aria-label="Jobless Coders Homepage"
    >
      <Image
        src={logo}
        className="rounded-lg"
        alt="Jobless Coders logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-lg text-foreground">
        {visible ? (
          <div className="font-mono text-sm sm:text-base font-semibold">
            <span className="text-violet-500">{"<"}</span>J
            <span className="text-red-400">C</span>
            <span className="text-violet-500">{"/>"}</span>
          </div>
        ) : (
          <div className="font-mono text-sm sm:text-base font-semibold">
            <span className="text-violet-500">{"<"}</span>Jobless{" "}
            <span className="text-red-400">
              Coders<span className="text-violet-500">{"/>"}</span>
            </span>
          </div>
        )}
      </span>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold relative transition-all duration-150 inline-flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2";

  const variantStyles = {
    primary:
      "bg-violet-600 hover:bg-violet-500 text-white shadow-sm hover:-translate-y-0.5",
    secondary: "bg-transparent text-foreground hover:bg-muted",
    dark: "bg-neutral-900 text-white hover:bg-neutral-800",
    gradient:
      "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm hover:-translate-y-0.5",
  };

  if (href && !href.startsWith("http")) {
    const { onClick } = props as { onClick?: React.MouseEventHandler<HTMLAnchorElement> };
    return (
      <Link
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
