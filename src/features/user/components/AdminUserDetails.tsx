import { X } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { useUser } from "../hooks";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  userId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const AdminUserDetails: React.FC<Props> = ({
  userId,
  open: initialOpen = false,
  onOpenChange,
}) => {
  const [open, setOpen] = useState(initialOpen);
  const { data: user, isLoading } = useUser(userId);

  const maidenName =
    user?.maidenName !== undefined
      ? user.maidenName.length === 0
        ? "-"
        : user.maidenName
      : "-";

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={setOpen}
      onAnimationEnd={() => {
        onOpenChange?.(open);
      }}
    >
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader className="flex flex-row justify-between">
          <DrawerTitle>User Details</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="outline" size="icon">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 italic text-nowrap text-xs text-muted-foreground">
            <Spinner className="h-4 w-4" /> Fetching user details...
          </div>
        )}

        {!isLoading && user && (
          <div className="no-scrollbar overflow-y-auto px-4">
            <Avatar className="size-20">
              <AvatarImage src={user.image} />
              <AvatarFallback>
                {user.firstName.charAt(0) + user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <UserDetailItem label="Id" value={user.id} />
            <UserDetailItem label="First Name" value={user.firstName} />
            <UserDetailItem label="Last Name" value={user.lastName} />
            <UserDetailItem label="Maiden Name" value={maidenName} />
            <UserDetailItem label="Age" value={user.age} />
            <UserDetailItem label="Gender" value={user.gender} />
            <UserDetailItem label="Email" value={user.email} />
            <UserDetailItem label="Phone" value={user.phone} />
            <UserDetailItem label="Username" value={user.username} />
            <UserDetailItem label="Company Name" value={user.company.name} />
            <UserDetailItem
              label="Company Department"
              value={user.company.department}
            />
            <UserDetailItem label="Company Title" value={user.company.title} />
            <UserDetailItem label="Address" value={user.address.address} />
            <UserDetailItem label="City" value={user.address.city} />
            <UserDetailItem label="State" value={user.address.state} />
            <UserDetailItem
              label="Postal Code"
              value={user.address.postalCode}
            />
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

const UserDetailItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-col gap-0.5 py-2">
      <h4 className="text-sm font-bold">{label}</h4>
      <p className="text-base">{value}</p>
    </div>
  );
};
