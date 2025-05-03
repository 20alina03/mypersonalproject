
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
          <Avatar className="h-8 w-8 border avatar-ring">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">@alexjourneys</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/journal" className="cursor-pointer">My Journal</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/map" className="cursor-pointer">My Map</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/roammates" className="cursor-pointer">Roammates</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/login" className="cursor-pointer text-muted-foreground">Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
