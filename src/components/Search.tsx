import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SearchNormal1 } from 'iconsax-react'
import { FormItem } from './ui/form'

function TalkSearch() {
  return (
    <div className="flex flex-col space-y-1 w-full px-0 sm:!w-[35vw] sm:min-w-60 md:max-w-100">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchNormal1 className="w-5 stroke-[var(--bg-text)]" />
        </div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Search Vendors, Products..."
          className="w-full pl-10 pr-4 py-2 sm:py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[1px] focus:ring-[var(--inactive-grey)] focus:border-[1px] focus:border-[var(--inactive-grey)] text-sm"
        />
      </div>
    </div>
  )
}

export default TalkSearch

function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <FormItem className="relative flex-1 sm:flex-1 md:max-w-100">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search Vendors, Products..."
          className="pl-8 w-full md:!w-80 md:py-5"
        />
        <SearchNormal1 className="w-5 stroke-[var(--bg-text)] pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none" />
      </FormItem>
    </form>
  )
}

export { SearchForm }
