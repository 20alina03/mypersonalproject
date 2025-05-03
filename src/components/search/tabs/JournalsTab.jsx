
import { Calendar } from 'lucide-react';
import JournalCard from '@/components/journal/JournalCard';

const JournalsTab = ({ entries, addTagFilter }) => {
  return (
    <>
      {entries.length === 0 ? (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Journal Entries Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map(entry => (
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
      )}
    </>
  );
};

export default JournalsTab;
