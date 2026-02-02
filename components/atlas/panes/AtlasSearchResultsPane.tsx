import { AtlasNavigationItem } from "@/types/AtlasNavigatorTypes"
import Link from "next/link";

type AtlasSearchResultsPaneProps = {
    navigatorItems: AtlasNavigationItem[];
}

export default function AtlasSearchResultsPane({ navigatorItems }: AtlasSearchResultsPaneProps) {
    return (
        <div>
            {(navigatorItems && navigatorItems.length > 0) ?
                (<ul>
                    {navigatorItems.map((navigatorItem) => (
                        <li key={navigatorItem.id}>
                            <Link href={navigatorItem.link}>{navigatorItem.name}</Link>
                        </li>
                    ))}
                </ul>) :
                (<div>
                    <p>No search results...</p>
                </div>)}
        </div>
    )
}