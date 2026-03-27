'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import AtlasSearchResultsPane from '@/components/atlas/panes/AtlasSearchResultsPane'
import { searchFiles } from "@/actions/queries";
import { useDebouncedCallback } from "use-debounce";
import { AtlasNavigationItem, AtlasNavigationTypes } from "@/types/AtlasNavigatorTypes";
import { useState, useEffect } from "react";

type AtlasSearchPaneProps = {
    navigatorItems: AtlasNavigationItem[];
}

export default function AtlasSearchPane() {
    const QUERY_PARAM_NAME = 'query';
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get(QUERY_PARAM_NAME) ?? '';

    // 2. Local State to hold the results
    const [results, setResults] = useState<AtlasNavigationItem[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // 3. The Effect: When the URL 'query' changes, fetch data!
    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setResults([]); // Clear results if query is empty
                return;
            }

            setIsSearching(true);
            try {
                // CALL THE SERVER ACTION DIRECTLY
                // This works because Server Actions are just async functions!
                const data = (await searchFiles(query));
                
                const links: AtlasNavigationItem[] = data.map((fileRes) => {
                    return {
                        id: fileRes.name,
                        name: `${fileRes.readableId}-${fileRes.name}`,
                        type: AtlasNavigationTypes.File,
                        link: `/projects/${fileRes.projectId}/files/${fileRes.id}`
                    }
                })

                setResults(links);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsSearching(false);
            }
        };

        fetchResults();
    }, [query]); // <--- Dependency: Run this whenever 'query' change

    const clearQuery = () => {
        const params = new URLSearchParams(searchParams);
        params.delete(QUERY_PARAM_NAME);
        router.replace(`${pathname}?${params.toString()}`);
    }

    const updateQuery = async (query: string) => {
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set(QUERY_PARAM_NAME, query);
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            clearQuery();
        }
    }

    const debouncedUpdateQuery = useDebouncedCallback((query: string) => { updateQuery(query) }, 400);

    return (
        <div id='atlas-search-pane'>
            <div id='atlas-search-pane_header'>
                <h2>Search files...</h2>
            </div>
            <div id='atlas-search-pane_input-bar'>
                <Input id='search-query'
                    placeholder='(e.g. "proton", "cheesecake")'
                    onChange={(e) => debouncedUpdateQuery(e.target.value)}
                    defaultValue={searchParams.get(QUERY_PARAM_NAME) ?? ''}
                />
            </div>
            <div id='atlas-search-pane_results-container'><AtlasSearchResultsPane navigatorItems={results}></AtlasSearchResultsPane></div>
        </div>
    );
}