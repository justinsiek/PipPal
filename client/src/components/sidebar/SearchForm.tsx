import { Search } from 'lucide-react'

interface SearchFormProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function SearchForm({ searchTerm, setSearchTerm, onSubmit }: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search and track stocks..."
          className="w-full bg-white/5 backdrop-blur-sm border border-white/[0.05] 
            text-white rounded-xl py-2 px-4 pl-10
            focus:outline-none focus:border-white/[0.1]
            focus:bg-white/5
            placeholder:text-gray-500
            transition-colors duration-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
    </form>
  )
}