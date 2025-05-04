
import { Calendar } from 'lucide-react';
import JournalCard from '@/components/journal/JournalCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";

const JournalsTab = ({ entries, addTagFilter }) => {
  return (
    <>
      {entries.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Journal Entries Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Travel Stories</h3>
              <Badge variant="outline" className="bg-primary/5">{entries.length} found</Badge>
            </div>
            <Button variant="outline" asChild>
              <a href="/journal">View All Journals</a>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <JournalCard
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
                  onTagClick={(tag) => addTagFilter && addTagFilter(tag)}
                  isPrivate={entry.isPrivate}
                />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default JournalsTab;
