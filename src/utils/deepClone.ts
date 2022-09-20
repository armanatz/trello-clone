export default function deepClone<T>(obj: any | any[]): T {
  if (typeof obj !== 'undefined') {
    return JSON.parse(JSON.stringify(obj));
  } else {
    throw new Error(
      'Item passed cannot be cloned as it is undefined',
    );
  }
}
