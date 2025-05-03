
import { Button } from "@/components/ui/button";
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NotificationsDropdown = () => {
  const notifications = [
    {
      id: 'notif1',
      type: 'comment',
      content: 'Maya Patel commented on your journal entry',
      time: '5 min ago',
      read: false
    },
    {
      id: 'notif2',
      type: 'roammate',
      content: 'Carlos Rodriguez sent you a roammate request',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'notif3',
      type: 'like',
      content: 'Emma Wilson liked your Tokyo journal entry',
      time: '1 day ago',
      read: true
    }
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-secondary">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <>
            {notifications.map(notification => (
              <DropdownMenuItem key={notification.id} className={`cursor-pointer py-3 ${!notification.read ? 'bg-muted/50' : ''}`}>
                <div className="flex flex-col space-y-1">
                  <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            You have no new notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
