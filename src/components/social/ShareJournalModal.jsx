
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share, Link, Mail, MessageSquare } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const ShareJournalModal = ({ journal }) => {
  const [open, setOpen] = useState(false);
  const [shareOption, setShareOption] = useState('public');
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://roamjournal.app/journal/${journal.id}`);
    toast({
      title: "Link Copied",
      description: "Journal link has been copied to clipboard"
    });
  };
  
  const handleShare = () => {
    // In a real app, this would make an API call to update sharing settings
    toast({
      title: "Journal Shared",
      description: `Journal is now ${shareOption === 'public' ? 'public' : shareOption === 'roammates' ? 'shared with roammates' : 'private'}`
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2" size="sm">
          <Share size={16} />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Journal Entry</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-sm font-medium mb-2">{journal.title}</h3>
          <div className="flex items-center gap-2">
            <Badge>{journal.location}</Badge>
            {journal.isPrivate && <Badge variant="outline" className="bg-muted">Private</Badge>}
          </div>
          
          <div className="grid gap-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Mail size={16} />
                <span>Email</span>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <MessageSquare size={16} />
                <span>Message</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="grid flex-1">
                <Label htmlFor="link" className="sr-only">Link</Label>
                <Input
                  id="link"
                  defaultValue={`https://roamjournal.app/journal/${journal.id}`}
                  readOnly
                />
              </div>
              <Button type="button" size="sm" onClick={handleCopyLink}>
                <Link className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Privacy Settings</h4>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-switch">Public</Label>
                  <p className="text-xs text-muted-foreground">Anyone can view this journal</p>
                </div>
                <Switch
                  id="public-switch"
                  checked={shareOption === 'public'}
                  onCheckedChange={() => setShareOption('public')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="roammates-switch">Roammates Only</Label>
                  <p className="text-xs text-muted-foreground">Only people you're connected with can see</p>
                </div>
                <Switch
                  id="roammates-switch"
                  checked={shareOption === 'roammates'}
                  onCheckedChange={() => setShareOption('roammates')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="private-switch">Private</Label>
                  <p className="text-xs text-muted-foreground">Only you can see this journal</p>
                </div>
                <Switch
                  id="private-switch"
                  checked={shareOption === 'private'}
                  onCheckedChange={() => setShareOption('private')}
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleShare}>Save & Share</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareJournalModal;
