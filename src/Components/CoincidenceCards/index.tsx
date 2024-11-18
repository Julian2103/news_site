import { useFetch } from "@/Helpers";
import { getThemeArticle, getThemeNews } from "@/store/selectors";
import { ObjectArcticle } from "@/types";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { ArticleItem } from "../../Components";

type Props = {
   titleSummary: string;
};
const stopWords = [
   "a",
   "about",
   "above",
   "after",
   "again",
   "against",
   "all",
   "am",
   "an",
   "and",
   "any",
   "are",
   "aren't",
   "as",
   "at",
   "be",
   "because",
   "been",
   "before",
   "being",
   "below",
   "between",
   "both",
   "but",
   "by",
   "can't",
   "cannot",
   "could",
   "couldn't",
   "did",
   "didn't",
   "do",
   "does",
   "doesn't",
   "doing",
   "don't",
   "down",
   "during",
   "each",
   "few",
   "for",
   "from",
   "further",
   "had",
   "hadn't",
   "has",
   "hasn't",
   "have",
   "haven't",
   "having",
   "he",
   "he'd",
   "he'll",
   "he's",
   "her",
   "here",
   "here's",
   "hers",
   "herself",
   "him",
   "himself",
   "his",
   "how",
   "how's",
   "i",
   "i'd",
   "i'll",
   "i'm",
   "i've",
   "if",
   "in",
   "into",
   "is",
   "isn't",
   "it",
   "it's",
   "its",
   "itself",
   "let's",
   "me",
   "more",
   "most",
   "mustn't",
   "my",
   "myself",
   "no",
   "nor",
   "not",
   "of",
   "off",
   "on",
   "once",
   "only",
   "or",
   "other",
   "ought",
   "our",
   "ours",
   "ourselves",
   "out",
   "over",
   "own",
   "same",
   "shan't",
   "she",
   "she'd",
   "she'll",
   "she's",
   "should",
   "shouldn't",
   "so",
   "some",
   "such",
   "than",
   "that",
   "that's",
   "the",
   "their",
   "theirs",
   "them",
   "themselves",
   "then",
   "there",
   "there's",
   "these",
   "they",
   "they'd",
   "they'll",
   "they're",
   "they've",
   "this",
   "those",
   "through",
   "to",
   "too",
   "under",
   "until",
   "up",
   "very",
   "was",
   "wasn't",
   "we",
   "we'd",
   "we'll",
   "we're",
   "we've",
   "were",
   "weren't",
   "what",
   "what's",
   "when",
   "when's",
   "where",
   "where's",
   "which",
   "while",
   "who",
   "who's",
   "whom",
   "why",
   "why's",
   "with",
   "won't",
   "would",
   "wouldn't",
   "you",
   "you'd",
   "you'll",
   "you're",
   "you've",
   "your",
   "yours",
   "yourself",
   "yourselves",
   "nearly",
   "can",
   "will",
   "shall",
   "may",
   "might",
   "should",
   "would",
   "must",
];
export const CoincidenceCards = ({ titleSummary }: Props) => {
   const storeArticle = useSelector(getThemeArticle);
   const storeNews = useSelector(getThemeNews);

   const getSignificantWords = useCallback(() => {
      return titleSummary
         .split(/\W+/)
         .filter((word) => word && !stopWords.includes(word));
   }, [titleSummary]);

   const getRandomKeywords = (wordsArray: string[], numKeywords: number) => {
      const wordsSet = new Set();
      while (wordsSet.size < numKeywords && wordsSet.size < wordsArray.length) {
         const randomIndex = Math.floor(Math.random() * wordsArray.length);
         wordsSet.add(wordsArray[randomIndex]);
      }
      return Array.from(wordsSet);
   };

   const keywordsMemo = useMemo(() => {
      const significantWords = getSignificantWords();
      return getRandomKeywords(significantWords, 2).join(" ");
   }, [getSignificantWords]);

   const { data, error, loading } = useFetch<ObjectArcticle>(
      storeArticle
         ? `https://api.spaceflightnewsapi.net/v4/articles/?search=${keywordsMemo}`
         : storeNews
         ? `https://api.spaceflightnewsapi.net/v4/blogs/?search=${keywordsMemo}`
         : ""
   );

   if (loading) {
      return <h3>Loading...</h3>;
   }
   if (!data || error) {
      return <h3>No games...</h3>;
   }

   return (
      <ul
         className="cardWrapper"
         style={{ borderTop: "1px solid grey", marginTop: 0, paddingTop: 70 }}
      >
         {data.results.map((article) => {
            return (
               <li key={article.id}>
                  <ArticleItem {...article} />
               </li>
            );
         })}
      </ul>
   );
};
