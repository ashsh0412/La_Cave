export interface Wine {
  id: number;
  wine: string;
  winery: string;
  rating: {
    average: string;
    reviews: string;
  };
  location: string;
  image: string;
}
