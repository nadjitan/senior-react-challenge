import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { GetUsersResponse } from "@/types/user";
import { AdminUserDetails } from "./AdminUserDetails";
import { Fragment, useState } from "react";

type Props = {
  usersData: GetUsersResponse;
};

export const AdminUsersTable: React.FC<Props> = ({ usersData }) => {
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  return (
    <Table>
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="w-25">Id</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Maiden Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Company Department</TableHead>
          <TableHead>Company Title</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Postal Code</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {usersData.users.map((user) => (
          <Fragment key={user.id}>
            <TableRow
              onClick={() => {
                setExpandedUserId(user.id);
              }}
            >
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    {user.firstName.charAt(0) + user.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.maidenName}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.company.name}</TableCell>
              <TableCell>{user.company.department}</TableCell>
              <TableCell>{user.company.title}</TableCell>
              <TableCell>{user.address.address}</TableCell>
              <TableCell>{user.address.city}</TableCell>
              <TableCell>{user.address.state}</TableCell>
              <TableCell>{user.address.postalCode}</TableCell>
            </TableRow>

            {/* Only render user details on click */}
            {expandedUserId === user.id && (
              <AdminUserDetails
                userId={JSON.stringify(expandedUserId)}
                open={expandedUserId === user.id}
                onOpenChange={() => {
                  setExpandedUserId(null);
                }}
              />
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};
