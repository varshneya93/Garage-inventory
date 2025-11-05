'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-3 p-6 border rounded-lg">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
      <Skeleton className="h-12 w-3/4 mb-6" />
      <Skeleton className="h-6 w-1/2 mb-12" />
      <Skeleton className="h-64 w-full mb-8" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 border rounded-lg space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-6 border rounded-lg space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-48 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
