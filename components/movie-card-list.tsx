"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import MovieCard from "./movie-card";
import { searchMovies } from "actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { searchState } from "utils/recoil/atoms";
import { useInView } from "react-intersection-observer";

export default function MovieCardList() {
  const search = useRecoilValue(searchState);
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["movie", search],
      queryFn: ({ pageParam }) =>
        searchMovies({ search, page: pageParam, pageSize: 12 }),
      getNextPageParam: (lastPage) =>
        lastPage.page ? lastPage.page + 1 : null,
      retry: 1,
    });

  const { ref, inView } = useInView({
    threshold: 0.4,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    console.log(inView);
  }, [inView]);

  return (
    <div className="grid h-full w-full grid-cols-3 gap-1 md:grid-cols-4">
      {
        <>
          {data?.pages
            ?.map((page) => page.data)
            ?.flat()
            ?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          <div ref={ref}></div>
        </>
      }
      {(isFetching || isFetchingNextPage) && (
        <Spinner {...({ placeholder: "" } as any)} />
      )}
    </div>
  );
}
/**
 * useInfiniteQuery위하여 페이지별로 데이터를 따로 보관 -> 
 * 페이지 추적 가능 및 기존 데이터 구분과 캐싱, 상태관리 위함
 * 
 * 구조
 * data = {
    pages: [
     { data: [movie1, movie2, ...] },  // 첫 번째 페이지
     { data: [movie3, movie4, ...] },  // 두 번째 페이지
     { data: [movie5, movie6, ...] }   // 세 번째 페이지
    ]
  }

  첫 번째 map으로 배열만 추출
  [[movie1, movie2], [movie3, movie4], [movie5, movie6]]
  두 번째 flat으로 중첩배열을 단일 배열로 평탄화
  [movie1, movie2, movie3, movie4, movie5, movie6]
  세 번째 map으로 컴포넌트 변환

 */
