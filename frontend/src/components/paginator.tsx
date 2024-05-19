import React, { useState } from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './cn/pagination'

type PaginatorProps = {
  numOfPages: number;
  onPageClick: (page: number) => Promise<void>
}


export function Paginator(props: PaginatorProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const buildLinks = () => {
    const links: React.ReactElement[] = []

    for (let i = 0; i < props.numOfPages; i++) {
      const page = i + 1

      links.push(
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={() => {
              setCurrentPage(page)
              props.onPageClick(page)
            }}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return links
  }

  return (
    <div className="flex justify-end p-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={async () => {
                if (currentPage === 1) {
                  return
                }

                setCurrentPage(currentPage - 1)
                await props.onPageClick(currentPage - 1)
              }}
            />
          </PaginationItem>
          { buildLinks() }
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={async () => {
                if (currentPage === props.numOfPages) {
                  return
                }

                setCurrentPage(currentPage + 1)
                await props.onPageClick(currentPage + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
