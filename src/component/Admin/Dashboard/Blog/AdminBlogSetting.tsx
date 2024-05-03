import { useState, useMemo } from "react";
import styles from '@/styles/Admin/Dashboard/Blog/AdminBlogSetting.module.css';

// component
import AdminBlogSettingDetail from "./AdminBlogSettingDetail";

// utils
import { convertUtcToKoreanTime } from "../../../../../utils/utils";

interface BlogData {
    blog_index: number;
    blog_uniqueNum: number;
    admin_identification: string;
    blog_category: string;
    blog_title: string;
    blog_content: string;
    register_date: Date;
    edit_date: string;
    delete_date: string;
    register_ip: string;
    edit_ip: string;
    delete_ip: string;
    blog_is_deleted: boolean;
    blog_is_approved: boolean;
}

interface AdminBlogSettingProps {
    blogData: BlogData[];
}

interface AdminBlogSettingListProps {
    blogData: BlogData[];
    onOpenSettingDetail: () => void;
    onSetBlogSubData: (blogIndex: number) => void;
}

interface AdminBlogSettingListContentProps {
    index: number,
    blogIndex: number,
    blogTitle: string,
    blogCategory: string,
    registerDate: Date,
    blogIsApproved: boolean,
    blogIsDeleted: boolean,
    onOpenSettingDetail: () => void;
    onSetBlogSubData: (blogIndex: number) => void;
}

function AdminBlogSettingListContent(props: AdminBlogSettingListContentProps) {

    // lecture
    const index = props.index;
    const blogIndex = props.blogIndex;
    const blogCategory = props.blogCategory;
    const blogTitle = props.blogTitle;
    const registerDate = props.registerDate;
    const blogIsApproved = props.blogIsApproved;
    const blogIsDeleted = props.blogIsDeleted;

    const onOpenSettingDetail = props.onOpenSettingDetail;
    const onSetBlogSubData = props.onSetBlogSubData;

    // format date
    const koreanDate = convertUtcToKoreanTime(registerDate);
    const formattedKoreanDate = koreanDate.substring(0, 10);

    // format data
    const formattedBlogIsApproved = blogIsApproved ? 'O' : 'X';
    const formattedBlogIsDeleted = blogIsDeleted ? 'O' : 'X';
 
    return (
        <tr onClick={() => {
            onOpenSettingDetail();
            onSetBlogSubData(blogIndex);
        }}>
            <th>{index + 1}</th>
            <td>{blogCategory}</td>
            <td>{blogTitle}</td>
            <td>{formattedKoreanDate}</td>
            <td>{formattedBlogIsApproved}</td>
            <td>{formattedBlogIsDeleted}</td>
            <td>
                <button>수정하기</button>
            </td>
        </tr>
    )
}

function AdminBlogSettingList(props: AdminBlogSettingListProps) {

    // page props
    const blogData = props.blogData;

    // props
    const onOpenSettingDetail = props.onOpenSettingDetail;
    const onSetBlogSubData = props.onSetBlogSubData;

    // page nation
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate starting and ending index for current page
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;

    const firstPage = 1;
    const LastPage = blogData.length ? Math.ceil(blogData.length / itemsPerPage) : 1;

    const currentPageLecture = useMemo(() => {
        return blogData.slice(startIndex, endIndex);
    }, [blogData, startIndex, endIndex]);

    // on previous page
    const onPreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    }

    // on next page 
    const onNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <h1 className={styles.settingHead}>블로그 글 리스트들을 클릭후 설정해보세요.</h1>
            <div className={styles.settingBody}>
                <table>
                    <thead>
                        <tr>
                            <th>구분</th>
                            <td>카테고리</td>
                            <td>강의명</td>
                            <td>생성일</td>
                            <td>승인 여부</td>
                            <td>삭제 여부</td>
                            <td>수정하기</td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageLecture.map((item, index) => {
                            // Compute the original index from .....
                            const originalIndex = startIndex + index;

                            return (
                                <AdminBlogSettingListContent
                                    key={item.blog_index}
                                    index={originalIndex}
                                    blogIndex={item.blog_index}
                                    blogCategory={item.blog_category}
                                    blogTitle={item.blog_title}
                                    registerDate={item.register_date}
                                    blogIsApproved={item.blog_is_approved}
                                    blogIsDeleted={item.blog_is_deleted}
                                    onOpenSettingDetail={onOpenSettingDetail}
                                    onSetBlogSubData={onSetBlogSubData}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={styles.settingBottom}>
                {currentPage !== firstPage
                    &&
                    <button onClick={onPreviousPage}>이전</button>}
                {currentPage !== LastPage
                    &&
                    <button onClick={onNextPage}>다음</button>}
            </div>
        </>
    );
}

function AdminBlogSetting(props: AdminBlogSettingProps) {

    // page props
    const blogData = props.blogData;

    const [blogSubData, setBlogSubData] = useState<BlogData>();

    // render setting detail 
    const [renderSettingDetail, setRenderSettingDetail] = useState(false);

    // on open setting detail
    const onOpenSettingDetail = () => {
        setRenderSettingDetail(true);
    }

    // on close setting detail
    const onCloseSettingDetail = () => {
        setRenderSettingDetail(false);
    }

    // on set lecture blog sub data
    const onSetBlogSubData = (blogIndex: number) => {
        const matchedBlogData = blogData.find(item => item.blog_index === blogIndex);
        setBlogSubData(matchedBlogData);
    }

    return (
        renderSettingDetail && blogSubData
            ?
            <AdminBlogSettingDetail blogSubData={blogSubData} onCloseSettingDetail={onCloseSettingDetail} />
            :
            <AdminBlogSettingList
                blogData={blogData}
                onOpenSettingDetail={onOpenSettingDetail}
                onSetBlogSubData={onSetBlogSubData}
            />
    )
}

export default AdminBlogSetting;