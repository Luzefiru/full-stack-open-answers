import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../common/types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const createEntry = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, entry);
  return response.data;
};

export default { getAllEntries, createEntry };
