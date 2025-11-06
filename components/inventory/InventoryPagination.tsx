'use client';

import { useRouter, useSearchParams } from 'next/navigation';
// Components
import {
	Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink,
	PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination';

interface InventoryPaginationProps {
	currentPage: number;
	totalPages: number;
	search: string;
}

const InventoryPagination = ({ currentPage, totalPages, search }: InventoryPaginationProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const createPageUrl = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());

		params.set('page', page.toString());

		if (search) params.set('search', search);

		return `/inventory?${params.toString()}`;
	};

	const handlePageChange = (page: number) => {
		if (page === currentPage) return;
		
		router.push(createPageUrl(page));
	};

	const renderPageNumbers = () => {
		const pages: (number | 'ellipsis')[] = [];
		const maxVisible: number = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);

			if (currentPage <= 3) {
				for (let i = 2; i <= 4; i++) {
					pages.push(i);
				}

				pages.push('ellipsis');
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push('ellipsis');

				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				pages.push('ellipsis');

				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i);
				}

				pages.push('ellipsis');
				pages.push(totalPages);
			}
		}

		return pages;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={undefined}
						onClick={(e) => {
							e.preventDefault();

							if (currentPage > 1) handlePageChange(currentPage - 1);
						}}
						className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
					/>
				</PaginationItem>

				{renderPageNumbers().map((page, index) => {
					if (page === 'ellipsis') {
						return (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					}

					const isCurrentPage = currentPage === page;

					return (
						<PaginationItem key={page}>
							<PaginationLink
								href={isCurrentPage ? undefined : createPageUrl(page)}
								isActive={isCurrentPage}
								onClick={(e) => {
									e.preventDefault();
									if (!isCurrentPage) {
										handlePageChange(page);
									}
								}}
								className={isCurrentPage ? 'cursor-default' : 'cursor-pointer'}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						href={undefined}
						onClick={(e) => {
							e.preventDefault();

							if (currentPage < totalPages) handlePageChange(currentPage + 1);
						}}
						className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default InventoryPagination;