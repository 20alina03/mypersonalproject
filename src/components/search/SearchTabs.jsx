
const SearchTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b">
      <button
        className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => setActiveTab('all')}
      >
        All
      </button>
      <button
        className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'journals' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => setActiveTab('journals')}
      >
        Journals
      </button>
      <button
        className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'people' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => setActiveTab('people')}
      >
        People
      </button>
      <button
        className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'places' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => setActiveTab('places')}
      >
        Places
      </button>
    </div>
  );
};

export default SearchTabs;
