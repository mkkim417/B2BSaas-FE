import styled from "styled-components";

export const PaginationBox1 = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    /* margin-top: 10px; */
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 40px;
    height: 40px;
    /* border: 1px solid #e2e2e2; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #928e8e;
    font-size: 1.1rem;
  }

  ul.pagination li.active a {
    color: #14B769;
  }

  ul.pagination li.active {
    background-color: white;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #14B769;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;