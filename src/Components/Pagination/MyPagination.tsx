import { AppDispatch } from "@/redux/store";
import { setPage } from "@/slices/UserSlice/UserSlice";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/UI/Pagination";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function MyPagination() {
  const [totallPages, setTotalPages] = useState(7);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[...Array(totallPages + 1).keys()].map((item) => {
          return (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                onClick={() => dispatch(setPage(item + 1))}
              >
                {item + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default MyPagination;
