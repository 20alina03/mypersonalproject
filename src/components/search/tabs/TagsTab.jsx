
import { Tag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import JournalCard from '@/components/journal/JournalCard';

const TagsTab = ({ tags, entries, addTagFilter }) => {
  return (
    <>
      {tags.length === 0 ? (
        <div className="text-center py-12">
          <Tag size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Tags Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <Badge 
                key={tag.name} 
                className="px-3 py-2 text-base cursor-pointer bg-muted/70 hover:bg-primary/10 hover:text-primary"
                onClick={() => addTagFilter(tag.name)}
              >
                {tag.name}
                <span className="ml-2 text-muted-foreground">({tag.count})</span>
              </Badge>
            ))}
          </div>
          
          <h3 className="font-semibold mb-4">Related Journal Entries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.slice(0, 3).map(entry => (
              <JournalCard
                key={entry.id}
                id={entry.id}
                title={entry.title}
                excerpt={entry.excerpt}
                location={entry.location}
                date={entry.date}
                imageUrl={entry.imageUrl}
                author={entry.author}
                likes={entry.likes}
                comments={entry.comments}
                tags={entry.tags}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TagsTab;
